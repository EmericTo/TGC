import { AdType } from "@/components/AdCard";
import { Layout } from "@/components/Layout";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Ad() {
  const [ad, setAd] = useState<AdType>();

  const router = useRouter();
  const adId = router.query.id as string;

  async function fetchAd() {
    const result = await axios.get<AdType>(`http://localhost:5000/ads/adId`);
    setAd(result.data);
  }

  useEffect(() => {
    
    if (adId !== undefined) {
      fetchAd();
    }
  }, [adId]);

  return (
    <Layout title="Ad">
      <main className="main-content">
        <p>Offre ID: {router.query.id}</p>
        {ad ? (
          <>
            <h2>{ad.title}</h2>
            <p>{ad.price} €</p>
          </>
        ) : adId ? (
          "Chargement/erreur"
        ) : (
          "Il manque l'id dans l'URL"
        )}
      </main>
    </Layout>
  );
}
