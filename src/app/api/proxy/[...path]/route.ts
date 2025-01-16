import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://170.64.216.95:4050/api/v1';

async function handler(
  request: Request,
  { params }: { params: { path: string[] } },
  method?: string
) {
  try {
    const path = params.path.join('/');
    const options: RequestInit = {
      method: method || request.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
    };

    if (method !== 'GET') {
      options.body = await request.text();
    }

    const response = await fetch(`${BACKEND_URL}/${path}`, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy Error' }, { status: 500 });
  }
}

export async function GET(request: Request, context: { params: { path: string[] } }) {
  return handler(request, context, 'GET');
}

export async function POST(request: Request, context: { params: { path: string[] } }) {
  return handler(request, context, 'POST');
}

export async function PATCH(request: Request, context: { params: { path: string[] } }) {
  return handler(request, context, 'PATCH');
}