import { ComponentStory, ComponentMeta } from "@storybook/react";
import AppAuthenticator from "./AppAuthenticator";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
    pageId: "login-config-totp.ftl"
});

export default {
    title: "login/AppAuthenticator",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Default: ComponentStory<typeof PageStory> = () => <PageStory />;