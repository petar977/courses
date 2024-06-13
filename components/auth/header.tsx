
interface HeaderProps{
    label: string;
    header: string;
}

export  function Header({label,header}: HeaderProps) {
  return (
    <div className="w-full flex flex-col 
    gap-y-4 items-center justify-center">
        <h1 className="text-3xl font-semibold">
            {header}
        </h1>
        <p className='text-muted-foreground'>
            {label}
        </p>
    </div>
  )
}
