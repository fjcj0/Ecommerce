import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const totalRevenueResult = await sql`
      SELECT COALESCE(SUM(s.price), 0) as total_revenue
      FROM sales s
      WHERE s.user_id = ${userId}
    `;
    const totalOrdersResult = await sql`
      SELECT COUNT(*) as total_orders
      FROM orders o
      WHERE o.user_id = ${userId}
    `;
    const lastProductsResult = await sql`
      SELECT 
        s.id,
        sh.title,
        sh.price,
        s.quantity,
        s.created_at,
        (
          SELECT url 
          FROM images 
          WHERE shoe_id = sh.id 
          ORDER BY created_at ASC 
          LIMIT 1
        ) as image_url
      FROM sales s
      INNER JOIN shoes sh ON s.shoe_id = sh.id
      WHERE s.user_id = ${userId}
      ORDER BY s.created_at DESC
      LIMIT 5
    `;
    const totalSalesResult = await sql`
      SELECT COUNT(*) as total_sales
      FROM sales s
      WHERE s.user_id = ${userId}
    `;
    const monthlySalesResult = await sql`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', s.created_at), 'YYYY-MM') as month,
        COALESCE(SUM(s.price), 0) as monthly_revenue,
        COUNT(*) as monthly_sales
      FROM sales s
      WHERE s.user_id = ${userId}
        AND s.created_at >= CURRENT_DATE - INTERVAL '9 months'
      GROUP BY DATE_TRUNC('month', s.created_at)
      ORDER BY month DESC
      LIMIT 9
    `;
    const deliveryStatsResult = await sql`
      SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_orders,
        CASE 
          WHEN COUNT(*) > 0 THEN 
            ROUND((COUNT(CASE WHEN status = 'delivered' THEN 1 END) * 100.0 / COUNT(*)), 2)
          ELSE 0 
        END as delivery_percentage
      FROM orders 
      WHERE user_id = ${userId}
    `;
    const response = {
      success: true,
      data: {
        totalRevenue: parseFloat(totalRevenueResult[0]?.total_revenue || 0),
        totalOrders: parseInt(totalOrdersResult[0]?.total_orders || 0),
        totalSales: parseInt(totalSalesResult[0]?.total_sales || 0),
        deliveryPercentage: parseFloat(deliveryStatsResult[0]?.delivery_percentage || 0),
        deliveredOrders: parseInt(deliveryStatsResult[0]?.delivered_orders || 0),
        lastFiveProducts: lastProductsResult.map(product => ({
          id: product.id,
          title: product.title,
          price: parseFloat(product.price || 0),
          quantity: product.quantity,
          soldAt: product.created_at,
          image: product.image_url || '/default-shoe-image.jpg'
        })),
        monthlySales: monthlySalesResult.reduce((acc, month) => {
          acc[month.month] = {
            revenue: parseFloat(month.monthly_revenue),
            salesCount: parseInt(month.monthly_sales)
          };
          return acc;
        }, {} as Record<string, { revenue: number; salesCount: number }>)
      }
    };
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : error
      },
      { status: 500 }
    );
  }
}