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
      productsPerMonth: [],
      salesPerMonth: [],
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
    const salesPerMonthRaw = await sql`
      SELECT 
        TO_CHAR(created_at, 'YYYY-Mon') AS month,
        SUM(price) AS total_sales,
        MIN(created_at) AS first_date
      FROM sales
      WHERE created_at >= CURRENT_DATE - INTERVAL '9 months'
      GROUP BY TO_CHAR(created_at, 'YYYY-Mon')
      ORDER BY first_date;
    `;
    adminDashboardInformation.salesPerMonth = salesPerMonthRaw.map(row => ({
      month: String(row.month),
      total: Number(row.total_sales),
    }));
    const lastProductsRaw = await sql`
  SELECT 
    sh.id AS shoe_id,
    sh.title AS product_name,
    (SELECT url FROM images img WHERE img.shoe_id = sh.id ORDER BY img.id ASC LIMIT 1) AS image_url,
    sh.created_at
  FROM shoes sh
  ORDER BY sh.created_at DESC
  LIMIT 10;
`;
    const topProducts: topTenProductProps[] = lastProductsRaw.map(row => ({
      shoe_id: Number(row.shoe_id),
      product_name: String(row.product_name),
      image: row.image_url ? String(row.image_url) : "",
      total_quantity_sold: 0,
      total_revenue: 0,
    }));
    adminDashboardInformation.topProducts = topProducts;
    const recentProductsRaw = await sql`
      SELECT *
      FROM shoes
      WHERE created_at >= CURRENT_DATE - INTERVAL '9 months'
      ORDER BY created_at DESC;
    `;
    adminDashboardInformation.productsPerMonth = recentProductsRaw.map(row => ({
      id: Number(row.id),
      title: String(row.title),
      created_at: row.created_at,
    }));
    return NextResponse.json(adminDashboardInformation, { status: 200 });
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 400 }
    );
  }
}