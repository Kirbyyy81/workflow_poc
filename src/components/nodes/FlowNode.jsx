import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import IconButton from "../ui/IconButton";
import  AddIcon from "@/components/assets/icons/AddIcon.jsx";



export default function FlowNode({

}) {
  return (
    <Card className="w-16 rounded-2xl shadow-md hover:shadow-lg transition-all p-2 border">
        <div>Start</div>
        <IconButton
            icon={AddIcon}
            tooltip="Delete Node"
            onClick={() => console.log("Run clicked")}
        />

    </Card>
  );
}