"use client";
import { appConfig } from "@/config/config";
import axios from "axios";
import { ArrowRight01Icon, SignatureIcon, UserIcon } from "hugeicons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SigningSuccessPage() {
  const [accounts, setAccounts] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [signingUrl, setSigningUrl] = useState("");
  const proceedToSigning = async (account_id: any, base_uri: any) => {
    try {
      const hash = window.location.hash;
      toast("Generating the signing URL. Please hold on...");
      const envelopeId = hash.split("#")[1].split("&")[4].split("=")[1];
      const res = await axios.get(
        `${appConfig.backendUrl}/api/envelope/get-signing-url?base_uri=${base_uri}&account_id=${account_id}&envelopeId=${envelopeId}&email=${email}&accessToken=${accessToken}&name=${name}`
      );
      const signingUrl = res.data.data.url;
      setSigningUrl(signingUrl);
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    (async () => {
      const hash = window.location.hash;
      const access_token = hash.split("#")[1].split("=")[1].split("&")[0];
      setAccessToken(access_token);
      const user = (
        await axios.get("https://account-d.docusign.com/oauth/userinfo", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      ).data;
      const email = user.email;
      const name = user.name;
      setName(name);
      setEmail(email);
      setAccounts(user.accounts);
    })();
  }, []);
  return (
    <div className="flex flex-col items-center mx-auto justify-center flex-1 w-full">
      {signingUrl.length > 0 ? (
        <div className="flex flex-col items-center gap-5">
          <SignatureIcon size={60} className="text-violet" />
          <h1 className="text-black font-regular text-[22px]">
            Here is your signing URL:{" "}
          </h1>
          <Link
            href={signingUrl}
            target="_blank"
            className="text-blue-500 flex items-center gap-1 hover:opacity-50 hover:transition-all transition-all duration-700 hover:duration-300"
          >
            Go to signing
            <ArrowRight01Icon className="text-violet" size={15} />
          </Link>
        </div>
      ) : (
        <h1 className="text-black font-regular text-[22px]">
          Select an account to use for signing
        </h1>
      )}
      {signingUrl.length === 0 && (
        <div className="flex flex-col mx-auto items-center gap-5 w-[400px] mt-10">
          {accounts !== null ? (
            <>
              {accounts.map((act: any) => (
                <button
                  className="flex flex-col border border-violet bg-opacity-20 border-opacity-20 rounded-xl p-3 w-full hover:bg-violet hover:bg-opacity-10 cursor-pointer group transition-all hover:transition-all duration-1000 hover:duration-1000"
                  key={act.account_id}
                  onClick={() => proceedToSigning(act.account_id, act.base_uri)}
                >
                  <div className="w-full flex items-center gap-3">
                    <div className="w-[35px] h-[35px] border-2 border-violet flex items-center justify-center rounded-xl bg-violet bg-opacity-10 border-opacity-25">
                      <UserIcon className="text-violet" size={20} />
                    </div>
                    <h1 className="text-black truncate max-w-[200px] text-opacity-60">
                      {act.account_name}
                    </h1>
                  </div>
                  <div className="w-full flex items-end justify-end">
                    <div className="text-violet text-[14px] flex items-center gap-1">
                      Proceed
                      <ArrowRight01Icon size={15} className="text-violet" />
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <span className="loading loading-dots loading-md text-violet"></span>
          )}
        </div>
      )}
    </div>
  );
}

export default SigningSuccessPage;
