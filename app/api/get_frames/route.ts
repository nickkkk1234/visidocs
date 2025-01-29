import { NextResponse } from 'next/server';
import supabase from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const frameIdsString = searchParams.get('frameIds');

  if (!frameIdsString) {
    return NextResponse.json({ error: "No frame IDs provided" }, { status: 400 });
  }

  let frameIds: number[];
  try {
    frameIds = JSON.parse(frameIdsString);
  } catch (error) {
    return NextResponse.json({ error: "Invalid frame IDs format" }, { status: 400 });
  }

  if (!Array.isArray(frameIds) || frameIds.length === 0) {
    return NextResponse.json({ error: "No frame IDs provided" }, { status: 400 });
  }
  
  try {
    const { data, error } = await supabase
      .from('Frames')
      .select(`
        id,
        tools,
        action,
        raw_img
      `)
      .in('id', frameIds);
    
    if (error) {
      console.error("Error from the frames fetch:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (data) {
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 });

  } catch (error) {
    console.error("Error retrieving frames:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving the frames." }, 
      { status: 500 }
    );
  }
}