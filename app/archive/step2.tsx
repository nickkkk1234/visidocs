import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import Header from "./Header";
import { data } from "../page";

export default function Step2(props: {value: any, index: any, image: any, tools: any, desc1: any, desc2: any}) {
    return (
    <Accordion className="min-w-md rounded-lg" type="single" collapsible>
        <AccordionItem value={`item-${props.index}`} className="group data-[state=open]:bg-black1 hover:bg-black2 border-2 border-black2  rounded-lg duration-300">
          <AccordionTrigger className="duration-300">
            <b>Step 2<span>{props.value}</span></b> <b className="pt-1 pb-2 font-normal text-center">{data[props.index].progression}</b>
          </AccordionTrigger>
          <AccordionContent className="group-data-[state=open]:h-fit overflow-auto pr-4 ">
          <div className="flex flex-col space-y-4">
            <Header title="Tools: " value={props.tools} size="small" colorClassName="accent1" />
            <h3 className="text-2xl font-semibold text-center text-gray-100 pt-4">Action Items</h3>
            <div className="border-sage2 border-[0.75px] rounded-lg" /> 
              <div className="flex pt-4">
                <div className="w-1/3 rounded-lg">
                  <Image className="rounded-lg" src={props.image} alt="Description 1" width={100} height={100} layout="responsive" />
                </div>
                <div className="w-2/3 pl-4 flex items-center">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-md text-gray-100">{props.desc1}</li>
                    <li className="text-md text-gray-100">{props.desc2}</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
}

