import Image from "next/image";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import Header from "./Header";
import { data } from "../page";

export default function Step1() {
    return (
    <Accordion className="min-w-lg max-w-3xl border-2 border-black2 rounded-lg" type="single" collapsible>
        <AccordionItem value="item-1" className="group data-[state=open]:bg-black1 hover:bg-black2 rounded-lg duration-300">
          <AccordionTrigger className="duration-300">
            <b>Step 4</b> <b className="pt-1 pb-2 font-normal text-center">{data[1].progression}</b>
          </AccordionTrigger>
          <AccordionContent className="group-data-[state=open]:h-[65dvh] overflow-auto pr-4">
          <div className="flex flex-col space-y-4">
            <Header title="Tools: " value="tool1, tool2, tool3, tool4" size="small" colorClassName="accent1" />
            <h3 className="text-2xl font-semibold text-center text-gray-100 pt-4">Action Items</h3>
            <div className="border-sage2 border-[0.75px] rounded-lg" /> 
            <div className="flex py-4">
              <div className="w-1/3 rounded-lg">
                <Image className="rounded-lg" src={image1} alt="Description 1" width={100} height={100} layout="responsive" />
              </div>
              <div className="w-2/3 pl-4 flex items-center">
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-md text-gray-100">Prepare the workspace using <span className="text-sage2 font-bold">tool2</span>.</li>
                  <li className="text-md text-gray-100">Measure the materials accurately with the millimeter ruler.</li>
                  <li className="text-md text-gray-100">Cut the materials to the required size.</li>
                  <li className="text-md text-gray-100">Prepare the solution with <span className="text-sage2 font-bold">tool4</span> and set aside.</li>
                </ul>
              </div>
            </div>
            <div className="flex py-4">
              <div className="w-1/3 rounded-lg">
                <Image className="rounded-lg" src={image2} alt="Description 2" width={100} height={100} layout="responsive" />
              </div>
              <div className="w-2/3 pl-4 flex items-center">
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-md text-gray-100">Bullet point 1 for the first image.</li>
                  <li className="text-md text-gray-100">Bullet point 2 for the first image.</li>
                  <li className="text-md text-gray-100">Bullet point 3 for the first image.</li>
                  <li className="text-md text-gray-100">Bullet point 4 for the first image.</li>
                </ul>
              </div>
            </div> 
            <div className="flex py-4">
              <div className="w-1/3 rounded-lg">
                <Image className="rounded-lg" src={image3} alt="Description 3" width={100} height={100} layout="responsive" />
              </div>
              <div className="w-2/3 pl-4 flex items-center">
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-md text-gray-100">Bullet point 1 for the first image.</li>
                  <li className="text-md text-gray-100">Bullet point 2 for the first image.</li>
                  <li className="text-md text-gray-100">Bullet point 3 for the first image.</li>
                  <li className="text-md text-gray-100">Bullet point 4 for the first image.</li>
                </ul>
              </div>
            </div>
          </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
}

