import { TbMoodSadDizzy } from "react-icons/tb";

function Error() {
  return (<div className="centered flex-col">
    <TbMoodSadDizzy className="size-28 text-red-600" />
    <br />
    <p className="text-2xl font-semibold">
      Lo siento, ha ocurrido un error.
    </p>
  </div>)
}

export default Error

