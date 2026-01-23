// function page() {
//   return <div>Home page</div>;
// }

// export default page;

import { redirect } from "next/navigation";
function page() {
  return redirect("/dashboard/overview");
}

export default page;
