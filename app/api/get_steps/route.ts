import { NextResponse } from 'next/server';
import supabase from "@/lib/supabase";

export async function GET() {

  try {
    const { data, error } = await supabase
      .from('Steps')
      .select(`
        id,
        substeps,
        title,
        progression
      `)
      .order('id');
    
    if (error) {
      console.error("Error from the steps fetch:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (data) {
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 });

  } catch (error) {
    console.error("Error retrieving steps:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving the steps." }, 
      { status: 500 }
    );
  }
}