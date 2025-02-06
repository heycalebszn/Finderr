import TabMenu from "../components/ui/tab";

const Onboarding = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="logo font-bold italic text-white text-[2rem] pt-[50px]">Finder</h1>
        <TabMenu />
    </div>
  )
}

export default Onboarding;