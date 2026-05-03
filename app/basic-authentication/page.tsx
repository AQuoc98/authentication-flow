import LoginForm from "@/components/authentication/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BasicAuthenticationPage() {
  return (
    <div className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader className="gap-6">
          <div>
            <CardTitle className="mb-1.5 text-2xl">
              Basic Authentication
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <LoginForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
