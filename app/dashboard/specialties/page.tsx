import SpecialtiesPage from "@/app/dashboard/specialties/SpecialtiesPage";

export const metadata = {
  title: "Specialties - Scrub Dashboard",
  description: "Specialties management page",
};

function page() {
  return (
    <>
      <SpecialtiesPage />
    </>
  );
}

export default page;
