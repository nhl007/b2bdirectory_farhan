"use client";

import { selectOptionsB2B } from "@/constants/constants";
import { ChevronDown, MapPin, Search, X } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
import Select from "react-select";
import { cn, generateSelectDefault } from "@/utils/utils";
import { getPostalCodeSuggestion } from "@/utils/postalCodeSearch";

const SearchBar = () => {
  const customStyles: any = {
    control: (base: any) => ({
      ...base,
      height: 71,
      minHeight: 30,
      boxShadow: "none",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 0,
      "&:hover": {
        outline: "none",
      },
    }),
  };

  const [keyword, setKeyword] = useState("");

  const [postCode, setPostCode] = useState("");
  const [postCodeList, setPostCodeList] = useState<string[] | null>(null);

  const [category, setCategory] = useState("");

  const router = useRouter();

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (postCodeList?.length) {
      return;
    }

    const urlObj = {
      keyword: keyword,
      postalCode: postCode,
      category: category,
    };

    let url = "/directory/s?";

    for (const [key, value] of Object.entries(urlObj)) {
      url = url + key + "=" + value + "&";
    }
    router.push(url);
  };

  const handlePostCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostCode(e.target.value);
    if (e.target.value.length > 2) {
      const postCodes = await getPostalCodeSuggestion(e.target.value);
      if (postCodes) setPostCodeList(postCodes);
      return;
    }
    setPostCodeList(null);
  };

  const [bottomList, setBottomList] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuList, setShowMenuList] = useState(false);

  const [list, setList] = useState<(typeof selectOptionsB2B)[0][] | null>([]);

  return (
    <section className=" bg-bg-banner py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col rounded-2xl p-6 bg-bg-main">
          <form
            className="flex flex-col md:flex-row mt-4"
            onSubmit={onSearchSubmit}
          >
            <div className="relative">
              <Search className="absolute left-2 h-full flex justify-center items-center" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Keyword or Business Name"
                name="keyword"
                type="text"
                className="rounded-t-[6px] md:rounded-l-[6px] py-3 text-base pl-[44px] pr-[16px] border w-full md:w-[340px] h-[71px] focus:outline-none"
              />
            </div>
            <div>
              <Select
                isClearable={true}
                id="category"
                value={generateSelectDefault(
                  [category] ?? [
                    {
                      label: "Category",
                      value: "",
                    },
                  ]
                )}
                instanceId="cat"
                name="category"
                options={selectOptionsB2B}
                className="w-full md:w-[340px] h-auto text-base"
                onChange={(val) => {
                  setCategory(val?.value ?? "");
                }}
                styles={customStyles}
                isSearchable={true}
                placeholder="Any Category"
              />
            </div>

            <div className="relative">
              <MapPin className=" absolute left-2 h-full flex justify-center items-center" />
              {postCode && (
                <X
                  size={18}
                  onClick={() => {
                    setPostCode("");
                    setPostCodeList(null);
                  }}
                  className=" absolute cursor-pointer right-2 h-full flex justify-center items-center"
                />
              )}
              <input
                placeholder="Suburb or Post Code"
                onChange={handlePostCodeChange}
                value={postCode}
                name="postalCode"
                type="text"
                className=" py-3 text-base pl-[44px] pr-[16px] border w-full md:w-[340px] h-[71px] focus:outline-none"
              />
              {postCodeList && (
                <div className=" z-50 max-h-[150px] rounded-b-md border-b-2 border-x-2 absolute top-[70px] pl-3 bg-white py-2 pb-2 left-0 w-full overflow-y-scroll flex flex-col gap-2">
                  {postCodeList.map((p, i) => {
                    return (
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          setPostCode(p);
                          setPostCodeList(null);
                        }}
                        key={i}
                      >
                        {p}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 md:mt-0 md:ml-2 bg-btn-orange md:text-lg text-txt-blue px-4 h-[71px] w-full rounded-md"
            >
              Search
            </button>
          </form>
          <div
            onMouseLeave={() => {
              setShowMenu(false);
              setShowMenuList(false);
              setBottomList(false);
            }}
            className=" flex gap-x-10 gap-y-4 mt-8 items-center flex-wrap relative"
          >
            <div
              onMouseEnter={() => {
                setShowMenuList(true);
                setList(selectOptionsB2B.slice(0, 3));
                setBottomList(false);
              }}
              className="flex gap-3 cursor-pointer hover:text-btn-orange font-medium items-center"
            >
              Business/Financial Management
              <ChevronDown />
            </div>
            <div
              onMouseEnter={() => {
                setShowMenuList(true);
                setList(selectOptionsB2B.slice(3, 5));
                setBottomList(false);
              }}
              className="flex gap-3 cursor-pointer hover:text-btn-orange font-medium items-center"
            >
              Marketing Services
              <ChevronDown />
            </div>
            <div
              onMouseEnter={() => {
                setShowMenuList(true);
                setList(selectOptionsB2B.slice(5, 9));
                setBottomList(false);
              }}
              className="flex gap-3 cursor-pointer hover:text-btn-orange font-medium items-center"
            >
              Tech/Digital Solutions
              <ChevronDown />
            </div>
            <div
              onMouseEnter={() => {
                setBottomList(false);
                setShowMenuList(true);
                setList(selectOptionsB2B.slice(9, 12));
              }}
              className="flex gap-3 cursor-pointer hover:text-btn-orange font-medium items-center"
            >
              HR/Training and Development
              <ChevronDown />
            </div>
            <div
              onMouseEnter={() => {
                setShowMenuList(true);
                setList(selectOptionsB2B.slice(12, 14));
                setBottomList(true);
              }}
              className="flex gap-3 cursor-pointer hover:text-btn-orange font-medium items-center"
            >
              Operational Support Services
              <ChevronDown />
            </div>
            <div
              onMouseEnter={() => {
                setShowMenuList(true);
                setList(selectOptionsB2B.slice(14));
                setBottomList(true);
              }}
              className="flex gap-3 cursor-pointer hover:text-btn-orange font-medium items-center"
            >
              Consulting/Strategic Planning
              <ChevronDown />
            </div>
            {(showMenu || showMenuList) && (
              <div
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => {
                  setShowMenu(false);
                  setShowMenuList(false);
                }}
                className={cn(
                  "absolute flex flex-wrap justify-start gap-x-[100px] gap-y-8 px-8 py-4 w-full bg-white shadow-lg rounded-lg",
                  bottomList ? "top-[62px]" : "top-[25px]"
                )}
              >
                {list?.map((data) => {
                  return (
                    <div key={data.label}>
                      <p className=" text-lg font-semibold">{data.label}</p>
                      <div className="flex flex-col gap-2 mt-2">
                        {data.options.map((p) => {
                          return (
                            <span
                              onClick={() => {
                                setCategory(p.value);
                                setShowMenu(false);
                                setShowMenuList(false);
                              }}
                              className="cursor-pointer"
                              key={p.label}
                            >
                              {p.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SearchBar;
