import { sql } from "@/config/db";
import { adminDashboardInformationProps, topTenProductProps } from "@/global.t";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const adminDashboardInformation: adminDashboardInformationProps = {
            sumOfSales: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalOrders: 0,
            totalOrdersDelivered: 0,
            percentAgeOfOrders: 0,
            topProducts: [],
        };
        const sumOfSales = await sql`SELECT SUM(price) AS total_sales FROM sales;`;
        adminDashboardInformation.sumOfSales = Number(sumOfSales[0]?.total_sales ?? 0);
        const totalProducts = await sql`SELECT COUNT(*) AS total_products FROM shoes;`;
        adminDashboardInformation.totalProducts = Number(totalProducts[0]?.total_products ?? 0);
        const totalUsers = await sql`SELECT COUNT(*) AS total_users FROM users;`;
        adminDashboardInformation.totalUsers = Number(totalUsers[0]?.total_users ?? 0);
        const totalOrders = await sql`SELECT COUNT(*) AS total_orders FROM orders;`;
        adminDashboardInformation.totalOrders = Number(totalOrders[0]?.total_orders ?? 0);
        const totalOrdersDelivered = await sql`
      SELECT COUNT(*) AS delivered_orders
      FROM orders
      WHERE status = 'delivered';
    `;
        adminDashboardInformation.totalOrdersDelivered = Number(totalOrdersDelivered[0]?.delivered_orders ?? 0);
        adminDashboardInformation.percentAgeOfOrders =
            adminDashboardInformation.totalOrders > 0
                ? (adminDashboardInformation.totalOrdersDelivered / adminDashboardInformation.totalOrders) * 100
                : 0;
        const topProductsRaw = await sql`
  SELECT 
    s.shoe_id,
    sh.title AS product_name,
    MIN(img.url) AS image_url,    
    SUM(s.quantity) AS total_quantity_sold,
    SUM(s.price) AS total_revenue
  FROM sales s
  JOIN shoes sh ON sh.id = s.shoe_id
  LEFT JOIN images img ON img.shoe_id = sh.id
  WHERE s.created_at >= CURRENT_DATE - INTERVAL '9 months'
  GROUP BY s.shoe_id, sh.title
  ORDER BY total_quantity_sold DESC
  LIMIT 10;
`;
        const topProducts: topTenProductProps[] = topProductsRaw.map((row) => ({
            shoe_id: Number(row.shoe_id),
            product_name: String(row.product_name),
            image: row.image_url ? String(row.image_url) : "",
            total_quantity_sold: Number(row.total_quantity_sold),
            total_revenue: Number(row.total_revenue),
        }));
        adminDashboardInformation.topProducts = topProducts;
        return NextResponse.json(adminDashboardInformation, { status: 200 });
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : String(error))
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}