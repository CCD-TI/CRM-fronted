"use client"; // Marca este componente como Client Component

import { DotIcon, SearchIcon } from "@/assets/icons";
import { formatMessageTime } from "@/lib/format-message-time";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import DropDownList from "./overview-cards/DropDownList";
import { useEffect, useState } from "react";
import ModalCont from "@/app/ui-elements/Modals/ModalCont";
import {getChatsData} from "@/app/(home)/fetch"




export function ChatsCard() {
  const [chats, setChats] = useState<any[]>([]);
  const [status, setStatus] = useState(true); // true = Activo, false = Inactivo
  useEffect(() => {
    async function fetchData() {
      const chatsData = await getChatsData();
      setChats(chatsData);
    }
    fetchData();
  }, []);
  const options = ["Asesores", "Supervisores", "Jefes"];
  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <div className="mb-5.5 flex justify-between px-7.5">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="focus-visible:border-DashCCd_blue flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>

        <div className="flex gap-10">
          <DropDownList Data={options} />

          <div className="mb-2 flex flex-col items-start justify-between">
            <span className="text-sm font-medium">Estado:</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={status}
                onChange={() => setStatus(!status)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span className="ml-3 w-[50px] text-sm font-medium text-gray-900 dark:text-gray-300">
                {status ? "Activos" : "Inactivos"}
              </span>
            </label>
          </div>
        </div>
      </div>

      <ul className="h-[700px] overflow-y-auto">
        {chats.map((chat, key) => (
          <li key={key}>
            <ModalCont
              Data={
                <div className="flex items-center gap-4.5 px-7.5 py-3 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-2 dark:focus-visible:bg-dark-2">
                  <div className="relative shrink-0">
                    <Image
                      src={chat.profile}
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover"
                      alt={"Avatar for " + chat.name}
                    />

                    <span
                      className={cn(
                        "absolute bottom-0 right-0 size-3.5 rounded-full ring-2 ring-white dark:ring-dark-2",
                        chat.isActive ? "bg-green" : "bg-orange-light",
                      )}
                    />
                  </div>

                  <div className="relative flex-grow">
                    <h3 className="font-bold text-blue-500 dark:text-white">
                      {chat.rol}
                    </h3>
                    <h3 className="font-medium text-dark dark:text-white">
                      {chat.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "truncate text-sm font-medium dark:text-dark-5 xl:max-w-[8rem]",
                          chat.unreadCount && "text-dark-4 dark:text-dark-6",
                        )}
                      >
                        {chat.lastMessage.content}
                      </span>

                      <DotIcon />

                      <time
                        className="text-xs"
                        dateTime={chat.lastMessage.timestamp}
                      >
                        {formatMessageTime(chat.lastMessage.timestamp)}
                      </time>
                    </div>

                    {!!chat.unreadCount && (
                      <div className="pointer-events-none absolute right-0 top-1/2 aspect-square max-w-fit -translate-y-1/2 select-none rounded-full bg-blue-500 px-2 py-0.5 text-sm font-medium text-white">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              }

             DataPrecio={chat.dataPrecio}
             Datalabel={chat.dataIndicador}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
