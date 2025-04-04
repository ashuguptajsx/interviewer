export async function GET(){
    return Response.json({success : true, data : "Thank You"}, {status : 200});
}