interface props{
  title: string
  subtitle?: string 
  colSpan?: String
  content?: React.ReactElement
}

function Card({ title, subtitle, content, colSpan="col-span-4"}: props) {
  return (
    <div className={`card flex flex-col ${colSpan}`}>
    <div className={`flex justify-between align`}>
      <p className="text-lg font-semibold text-slate-400">{title}</p>
      <span className="text-xl font-bold">{subtitle}</span>
    </div>
    {content &&
      <>
        {content}
      </>}
    </div>
  )
}

export default Card