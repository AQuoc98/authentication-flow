import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuthPageShellProps = {
  title: string;
  children: React.ReactNode;
};

const AuthPageShell = ({ title, children }: AuthPageShellProps) => {
  return (
    <div className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader className="gap-6">
          <div>
            <CardTitle className="mb-1.5 text-2xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPageShell;
