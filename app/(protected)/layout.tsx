import { Navbar } from "@/app/(protected)/_components/navbar/navbar";


interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className="h-full pt-20">
                {children}
            </div>

        </>
    );
}

export default ProtectedLayout;