interface HeadingProps{
    label: string
}
const Heading = ({label}: HeadingProps) => {
    return <h1 className="text-4xl font-bold pt-6">{label}</h1>
}

export default Heading