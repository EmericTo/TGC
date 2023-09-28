import { CategoryType } from "@/components/Categories";
import { Layout } from "@/components/Layout";

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

type AdFormData = {
  title: string;
  description: string;
  price: number;
  category: { id: number };
};

export default function NewAd() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState (false);
  /*const router = useRouter();*/

  async function fetchCategories() {
    const result = await axios.get<CategoryType[]>(`http://localhost:5000/categories`);
    setCategories(result.data);
  }

  useEffect(() => {
   
    fetchCategories();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as AdFormData;

    if ("categoryId" in data) {
      data.category = { id: Number(data.categoryId) };
      delete data.categoryId;
    }

    data.price = Number(data.price);

    if(data.title.trim().length < 3){
      setError("title")
      return;
    }

    if(data.price < 0){
      setError("price")
      return;
    }
    
    const result = await axios.post("http://localhost:5000/ads", data);
    if ("id" in result.data){
      form.reset();
      setHasBeenSent(true);
      /*router.push("http://localhost:5000/ads/[result.data.id]");*/
    }

    console.log(data);
  }

  return (
    <Layout title="Nouvelle offre">
      <main className="main-content">
        <p>Poster une nouvelle offre</p>
        {error === "price" && <p>Le prix doit être supérieur à 0</p>}
        {error === "title" && (<p>Un titre valable doit faire plus de 3 caractères</p>)}
        {hasBeenSent && <p>Offre ajoutée !</p>}

        <form onSubmit={onSubmit}>
          <input type="text" name="title" placeholder="Titre de l'annonce" />
          <br />
          <br />
          <input
            type="text" name="description" placeholder="Description de l'annonce"
          />
          <br />
          <br />
          <input type="number" name="price" placeholder="0,00€" />
          <br />
          <br />
          <input type="text" name="imgUrl" placeholder="Lien de l'image" />
          <br />
          <br />
          <input type="text" name="owner" placeholder="Nom du propriétaire" />
          <br />
          <br />
          <select name="categoryId">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <br />
          <br />
          <input type="text" name="Localisation" placeholder="Ville" />
          <br />
          <br />
          <button type="submit">Poster l&aposannonce</button>
        </form>
      </main>
    </Layout>
  );
}