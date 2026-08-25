// app/api/auth/login/route.ts

import { NextResponse } from "next/server";

export async function POST( request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(
      'http:127.0.0,0.1:8000/auth/login/',
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}