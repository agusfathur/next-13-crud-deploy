"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { Brand } from "@prisma/client";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // modal
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post("/api/products", {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    setIsLoading(false);
    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-neutral" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="Product Name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-neutral"
                onClick={handleModal}
              >
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button disabled className="btn loading"></button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
