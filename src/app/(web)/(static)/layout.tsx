import { Suspense } from "react";
import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading className="h-screen" />}>
      <div className=" max-w-4xl mx-auto p-4 md:p-8 ">
        {children}
        <Footer />
      </div>
    </Suspense>
  );
}
