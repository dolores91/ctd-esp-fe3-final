import { render, screen } from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";
import { comicsMock } from "dh-marvel/test/mocks/comics";
import { IComic } from "types/IComic.type";

describe('IndexPage', () => {
    describe('al renderizar index', () => {
        it('debería renderizar el titulo', async () => {
            render(<Index comics={comicsMock.data.results as unknown as IComic[]} total={comicsMock.data.total} offset={comicsMock.data.offset} limit={comicsMock.data.limit} />)
            const title = screen.getByText('DH MARVEL')
            expect(title).toBeInTheDocument()
        });
        it('deberia renderizar el titulo del comic', async () => {
            render(<Index comics={comicsMock.data.results as unknown as IComic[]} total={comicsMock.data.total} offset={comicsMock.data.offset} limit={comicsMock.data.limit} />)
            const title = screen.getByText('Marvel Previews (2017)')
            expect(title).toBeInTheDocument()
        })
    })

})
