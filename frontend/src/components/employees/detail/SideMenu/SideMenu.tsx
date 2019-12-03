import React from 'react';
import { useSelector } from 'react-redux';

import { Panel, Flex } from '../../../shared/layout';
import { Menu, MenuItem, MenuLink } from '../../../shared/layout/Panel/modules/Menu';
import { ActiveLink } from '../../../shared/misc';
import { selectUser } from '../../../../selectors/auth';
import { canManageWageData } from '../../../../api/shared/auth';

/* Props - <SideMenu />
============================================================================= */
type Props = {
  employee?: any;
};

/* <SideMenu />
============================================================================= */
const SideMenu: React.FunctionComponent<Props> = ({ employee }) => {
  const user = useSelector(selectUser);

  if (employee) {
    return (
      <Flex flexDirection="column">
        <Panel title="Základné údaje" isPadded={false} mb="s6">
          <Menu>
            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/personal`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Osobné informácie</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/company`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Firemné informácie</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/permanent_address`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Trvalá adresa</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/subsidiary_address`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Prechodná adresa</MenuLink>}
              </ActiveLink>
            </MenuItem>

            <MenuItem>
              <ActiveLink
                href="/employees/[id]/essential/[formType]"
                as={`/employees/${employee?.id}/essential/contact`}
                passHref
              >
                {isActive => <MenuLink isActive={isActive}>Kontakt</MenuLink>}
              </ActiveLink>
            </MenuItem>
          </Menu>
        </Panel>

        {canManageWageData(user) && (
          <Panel title="Mzdové údaje" isPadded={false}>
            <Menu>
              <MenuItem>
                <ActiveLink
                  href="/employees/[id]/wage/[formType]"
                  as={`/employees/${employee?.id}/wage/employment`}
                  passHref
                >
                  {isActive => <MenuLink isActive={isActive}>Pracovný pomer</MenuLink>}
                </ActiveLink>
              </MenuItem>

              <MenuItem>
                <ActiveLink
                  href="/employees/[id]/wage/[formType]"
                  as={`/employees/${employee?.id}/wage/tax`}
                  passHref
                >
                  {isActive => <MenuLink isActive={isActive}>Dane</MenuLink>}
                </ActiveLink>
              </MenuItem>

              <MenuItem>
                <ActiveLink
                  href="/employees/[id]/wage/[formType]"
                  as={`/employees/${employee?.id}/wage/statistics`}
                  passHref
                >
                  {isActive => <MenuLink isActive={isActive}>Štatistika</MenuLink>}
                </ActiveLink>
              </MenuItem>

              <MenuItem>
                <ActiveLink
                  href="/employees/[id]/wage/[formType]"
                  as={`/employees/${employee?.id}/wage/insurance`}
                  passHref
                >
                  {isActive => <MenuLink isActive={isActive}>Poistenie</MenuLink>}
                </ActiveLink>
              </MenuItem>
            </Menu>
          </Panel>
        )}
      </Flex>
    );
  } else {
    return (
      <Panel title="Základné údaje" isPadded={false} mb="s6">
        <Menu>
          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/personal`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Osobné informácie</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink href="/employee/create/[formType]" as={`/employee/create/company`} passHref>
              {isActive => <MenuLink isActive={isActive}>Firemné informácie</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/permanent_address`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Trvalá adresa</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink
              href="/employee/create/[formType]"
              as={`/employee/create/subsidiary_address`}
              passHref
            >
              {isActive => <MenuLink isActive={isActive}>Prechodná adresa</MenuLink>}
            </ActiveLink>
          </MenuItem>

          <MenuItem>
            <ActiveLink href="/employee/create/[formType]" as={`/employee/create/contact`} passHref>
              {isActive => <MenuLink isActive={isActive}>Kontakt</MenuLink>}
            </ActiveLink>
          </MenuItem>
        </Menu>
      </Panel>
    );
  }
};

export default SideMenu;
