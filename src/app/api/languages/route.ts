export async function GET() {
  return Response.json({
    languages: ["English", "Hindi", "Spanish", "French"],
  });
}
