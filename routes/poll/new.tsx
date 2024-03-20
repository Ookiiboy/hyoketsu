import { Handlers } from "$fresh/server.ts";
import { osType } from "$std/path/_os.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const options = form.get("pollOptions")?.toString().split(/\r?\n/);
    const id = form.get("id")?.toString();
    console.log(options); 
    // write to db?
    

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", `${id}/share`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Subscribe() {
  const id = btoa(Date.now().toString())
  return (
    <>
      <form method="post">
        <input type="hidden" name="id" value={id}></input>
        <textarea type="text" name="pollOptions"/><br/>
        <button type="submit">Make Poll</button>
      </form>
    </>
  );
}

