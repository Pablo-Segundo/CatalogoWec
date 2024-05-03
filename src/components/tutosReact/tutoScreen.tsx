import React from "react";
import { View } from "react-native";
import { CopilotProvider, CopilotStep, walkthroughable } from "react-native-copilot";

const  CopilotText = walkthroughable(Text);

export const TutoScreen = () => {
  return(
    <View>
       <CopilotStep text="This is a hello world example!" order={1} name="hello">
        <CopilotText>Hello world!</CopilotText>
      </CopilotStep>
    </View>
  );
};

