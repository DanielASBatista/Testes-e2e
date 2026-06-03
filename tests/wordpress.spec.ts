import { test, expect } from "@playwright/test";
import { Auth } from "../src/Auth";

test.describe("E2E Wordpress Playground", () => {
    test.beforeEach(async ({ page }) => {

        await page.goto("https://sosfinance.joaoc.dev", {
            timeout: 60000,
        })
    });

    test("teste", async ({ page }) => {


        const menuButton = page.getByRole("link", { name: "Educação Financeira" });

        await menuButton.click();

        const articleLink = page.locator('h2').getByRole('link', { name: "Por que é importante guardar" });

        await articleLink.click();

        const loginLink = page.getByRole('link', { name: 'login' }).click();

        await page.fill("#user_login", "etec");
        await page.fill("#user_pass", "etec123@@");
        await page.click("#wp-submit");

        await page.fill("#comment", "papai cris");
        await page.click("#submit");


    });
    test("fazer login e acessar o painel do admin", async ({ page }) => {
        const auth = new Auth(page);
        await auth.doLogin("etec", "etec123@@");

        await expect(
            await page.getByRole("heading", {
                name: "Painel",
            }),
        ).toBeVisible();
    });
});