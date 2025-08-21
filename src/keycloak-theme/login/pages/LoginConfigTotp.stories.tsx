import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginConfigTotp from "./LoginConfigTotp";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
    pageId: "login-config-totp.ftl"
});

export default {
    title: "login/LoginConfigTotp",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Default: ComponentStory<typeof PageStory> = () => <PageStory />;