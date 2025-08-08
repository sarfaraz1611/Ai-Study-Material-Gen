import { NextResponse } from 'next/server';
import { db } from '../../../configs/db';
import { USER_TABLE } from '../../../configs/schema';
import { eq } from 'drizzle-orm';

// export async function POST(request) {
//   try {
//     const { email, name } = await request.json();
    
//     // Check if user exists
//     const existingUser = await db
//       .select()
//       .from(USER_TABLE)
//       .where(eq(USER_TABLE.email, email));

//     if (existingUser.length === 0) {
//       // Create new user
//       const newUser = await db.insert(USER_TABLE).values({
//         name: name || "Unknown",
//         email: email,
//         isMember: false,
//       });
      
//       return NextResponse.json({ success: true, message: 'User created' });
//     }
    
//     return NextResponse.json({ success: true, message: 'User already exists' });
//   } catch (error) {
//     console.error('Error in user API:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const email = searchParams.get('email');
    
//     if (!email) {
//       return NextResponse.json(
//         { success: false, error: 'Email parameter is required' },
//         { status: 400 }
//       );
//     }
    
//     const user = await db
//       .select()
//       .from(USER_TABLE)
//       .where(eq(USER_TABLE.email, email));
    
//     return NextResponse.json({ success: true, user: user[0] || null });
//   } catch (error) {
//     console.error('Error in user API:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }