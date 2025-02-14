import { FC, useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { queryKeys } from "../../lib/queryKeys";
import { Loading } from "../Loading";
import { FeedbackForm } from "./FeedbackForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const FeedbackFormPasswordCheck: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const { data: needsPassword = true, isLoading } = useQuery({
    queryKey: [queryKeys.form.password, accessToken],
    queryFn: () => api.feedbackForm.needsPassword(accessToken),
    enabled: !!accessToken,
  });

  const { mutateAsync } = useMutation({
    mutationKey: [queryKeys.form.checkPassword, accessToken],
    mutationFn: ({ password }: { password: string }) =>
      api.feedbackForm.checkPassword(accessToken, password),
  });

  const onSubmit = async (password: string) => {
    const data = await mutateAsync({ password });
    setIsValidPassword(data);
  };

  useEffect(() => {
    if (needsPassword) return;

    // doesn't need password
    setIsValidPassword(!needsPassword);
  }, [needsPassword]);

  if (isLoading) {
    return <Loading />;
  }

  if (isValidPassword) {
    return <FeedbackForm accessToken={accessToken} />;
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-center py-4">Password required</h1>
      <p className="text-center">Please enter the password to continue</p>
      <div className="flex items-center gap-4 mt-4 max-w-md mx-auto">
        <Input placeholder="Enter password" ref={ref} />
        <Button onClick={() => onSubmit(ref.current?.value || "")}>
          Continue
        </Button>
      </div>
    </div>
  );
};
