import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { baseLinkStyles } from './base';

// eslint-disable-next-line import/prefer-default-export
export const InternalLink = styled(NavLink)`
    ${baseLinkStyles}
`;
