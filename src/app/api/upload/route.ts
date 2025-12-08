// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Файл не загружен' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate a unique filename
    const filename = `${uuidv4()}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', filename);
    
    // Save the file
    await writeFile(path, buffer);
    
    // Save to MongoDB
    await connectDB();
    const image = new Image({
      url: `/uploads/${filename}`,
      // Add other fields as needed
    });
    await image.save();

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}`
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке файла' },
      { status: 500 }
    );
  }
}