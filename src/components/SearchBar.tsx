import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SearchIcon } from "../svg/SearchIcon";
import { useRouter } from "../hooks/useRouter";
import { ILocationData, IRootState, setLocation, useAppDispatch } from "../store";
import { fetchLocation } from "../store";
import { useSelector } from "react-redux";
import localforage from "localforage";
import classNames from "classnames";
import { ILanguageObject, LanguageContext } from "../context/LanguageProvider";

const searchBarMessages: { [key: string]: ILanguageObject } = {
  error: {
    EN: "Address not found, try to be more specific...",
    PL: "Adres nie został znaleziony, spróbuj ponownie...",
  },
  search: {
    EN: "Search for an address",
    PL: "Wprowadź adres",
  },
};

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [touched, setTouched] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useAppDispatch();
  const {
    data: { address },
    error,
    isLoading,
  } = useSelector((state: IRootState) => state.location);

  const { language } = useContext(LanguageContext);

  const { query } = useRouter();

  const updateLocation = async (query: string | null) => {
    if (!query) {
      const lastAddress: ILocationData | null = await localforage.getItem("lastAddress");
      if (lastAddress) {
        dispatch(setLocation(lastAddress));
        return;
      }
      return;
    }

    const savedLocation: ILocationData | null = await localforage.getItem(query);
    if (savedLocation) {
      dispatch(setLocation(savedLocation));
      localforage.setItem("lastAddress", savedLocation);
      return;
    }

    dispatch(fetchLocation(query))
      .unwrap()
      .then((res) => {
        localforage.setItem("lastAddress", res);
        localforage.setItem(query, res);
      })
      .catch(() => {
        setTouched(false);
      });
  };

  useEffect(() => {
    const addressQuery = query.get("address");
    if (addressQuery !== address) {
      updateLocation(addressQuery);
      return;
    }
  }, []);

  const handleSubmit = async () => {
    updateLocation(searchTerm);
    setSearchTerm("");
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    !touched && setTouched(true);
  };

  const classes = classNames("flex w-full justify-center", {
    "animate-[shake_0.5s_ease-out]": !touched && error && !searchTerm,
  });

  const inputWrapper = classNames("relative w-1/4 lg:w-1/3 md:w-full flex items-center transition-all duration-300 ease-in-out", {
    "after:content-[' '] after:w-6 after:h-6 after:rounded-full after:border-4 after:border-theme-0 after:border-l-transparent after:absolute after:right-2 after:animate-spin":
      isLoading,
    "!w-[40%] lg:!w-1/3 md:!w-full": isFocused,
  });

  const inputClasses = classNames("bg-[#fefcfb0f] rounded-l-full py-2 px-4 !outline-none w-full focus:bg-[#fefcfb1b]", {
    "placeholder:text-red-300 !shadow-[inset_0_0_3px_#ff0000a0]": !touched && error && !searchTerm,
  });

  return (
    <div className={classes}>
      <div className={inputWrapper}>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          value={searchTerm}
          disabled={isLoading}
          placeholder={(!touched && error && searchBarMessages.error[language]) || searchBarMessages.search[language]}
          onChange={(e) => onInputChange(e)}
          onKeyDown={({ key }) => key === "Enter" && handleSubmit()}
        />
      </div>
      <div
        className="bg-theme-3 p-2 rounded-r-full cursor-pointer group hover:bg-theme-2 transition-colors duration-200 flex items-center z-10"
        onClick={handleSubmit}
      >
        <SearchIcon className="w-6 h-6" />
      </div>
    </div>
  );
};
