import { css } from 'styled-components';

export interface BaseLinkProps {
    active?: boolean;
    contrast?: boolean;
}

// eslint-disable-next-line no-unused-vars
export function baseLinkStyles(_: BaseLinkProps) {
    return css<BaseLinkProps>`
        color: ${({ theme, active, contrast }) =>
            // eslint-disable-next-line no-nested-ternary
            active
                ? contrast
                    ? theme.link.contrastActiveColor
                    : theme.link.activeColor
                : contrast
                ? theme.link.contrastColor
                : theme.link.color};
        text-decoration: ${({ theme }) => theme.link.decoration};

        &:hover {
            color: ${({ theme, contrast }) =>
                contrast ? theme.link.hover.contrastColor : theme.link.hover.color};
            text-decoration: ${({ theme }) => theme.link.hover.decoration};
        }
    `;
}
