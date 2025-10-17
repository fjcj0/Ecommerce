import { neon } from '@neondatabase/serverless';
export const sql = neon(
    `${process.env.NEXT_PUBLIC_POSTGRESS_API}`
);