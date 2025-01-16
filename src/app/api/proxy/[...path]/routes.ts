import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://170.64.216.95:4050/api/v1';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const response = await fetch(`${BACKEND_URL}/${path}`, {
    headers: {
      'Authorization': request.headers.get('Authorization') || '',
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await request.json();
  const response = await fetch(`${BACKEND_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': request.headers.get('Authorization') || '',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await request.json();
  const response = await fetch(`${BACKEND_URL}/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': request.headers.get('Authorization') || '',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data);
}