interface subHeadingProps{
    label: string
}

const SubHeading = ({label}: subHeadingProps) => {
    return <h3 className="text-slate-500 text-md p-4">{label}</h3>
}

export default SubHeading