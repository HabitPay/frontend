"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = <P extends object>(
  WrappedComponent: NextPage<P>
): NextPage<P> => {
  const ComponentWithAuth: NextPage<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        // 스낵바
        router.push("/");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
