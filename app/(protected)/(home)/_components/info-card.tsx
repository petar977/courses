import { Badge, LucideIcon, LucideProps } from "lucide-react"

interface InfoCardProps{
    icon: LucideIcon;
    label: string;
    numberOfItems: number
}

export const InfoCard = ({icon, label, numberOfItems}:InfoCardProps) => {
    return (
        <div className="border rounted-md flex items-center gap-x-3 p-3">
            <Badge className="rounded-full bg-indigo-300">
                <Icon icon={icon} />
            </Badge>
              <div>
                <p className="font-medium">
                    {label}
                </p>
                <p>
                    {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
                </p>
              </div>
        </div>
    )
}

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon />;
}