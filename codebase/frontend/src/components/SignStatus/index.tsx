import { appConfig } from "@/config/config";
import axios from "axios";
import { SignatureIcon } from "hugeicons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const SignStatus = ({ envelopeId }: { envelopeId: string }) => {
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const handleSigning = async () => {
    try {
      const { code_challenge, code_verifier } = (
        await axios.get(`${appConfig.backendUrl}/api/envelope/generate-pkce`)
      ).data;
      const redirect_uri = `${appConfig.frontendUrl}/sign/begin`;
      const integration_key = "a2d87ef7-05b1-4ac2-bf87-42708592da03";

      const uri = `https://account-d.docusign.com/oauth/auth?
   response_type=code
   &scope=signature cors
   &client_id=${integration_key}
   &state=${envelopeId}
   &redirect_uri=${redirect_uri}
   &code_challenge_method=S256
   &code_challenge=${code_challenge}`;

      window.open(uri, "_blank");
    } catch (err) {
      toast.error("An error occurred while initiating signing");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${appConfig.backendUrl}/api/envelope/${envelopeId}/getSignedDate`,
        );
        const data = response.data;
        if (data.signed_on === 0) setDate("");
        else setDate(new Date(data.signed_on).toUTCString());
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-2 pl-2">
      {loading ? (
        <>
          <span className="loading loading-dots loading-md text-violet"></span>
        </>
      ) : (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 pl-2 animate-in zoom-in fade-in duration-1000">
            <Image
              src={date ? "/signed.png" : "/not-signed.png"}
              width={25}
              height={25}
              alt="Signing status logo"
              className="pb-2"
            />
            {date.length > 0 ? (
              <p className="font-light text-black text-[12px] text-opacity-50">
                The envelope has been{" "}
                <span className="font-semibold">signed</span> on{" "}
                <span className="font-semibold">{date}</span>
              </p>
            ) : (
              <p className="font-light text-black text-[12px] text-opacity-50">
                The envelope has{" "}
                <span className="font-semibold">not yet been signed</span> by
                everyone
              </p>
            )}
          </div>
          <button
            onClick={handleSigning}
            className="bg-violet text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all"
          >
            <SignatureIcon size={15} className="text-white" strokeWidth={2} />
            <p className="text-white text-[12px]">Sign now</p>
          </button>
        </div>
      )}
    </div>
  );
};
