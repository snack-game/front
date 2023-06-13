import {FC} from "react";

import PageContainer from "@components/bases/PageContainer";

interface AppleGameProps{
    children?: never
}

export const AppleGame:FC<AppleGameProps> = () => {
    return (
        <PageContainer>
            <div></div>
        </PageContainer>
    );
};
