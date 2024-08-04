import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '../../src/components/ui/Button';
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
} from '../../src/components/ui/Menu';

const meta = {
  title: 'UI/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button variant="secondary" className="px-2">
        <MoreHorizontal className="w-5 h-5" />
      </Button>
      <Menu {...args}>
        <MenuItem id="new">New…</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuSeparator />
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="saveAs">Save as…</MenuItem>
        <MenuSeparator />
        <MenuItem id="print">Print…</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
};

export const DisabledItems: Story = {
  args: {
    disabledKeys: ['save'],
  },
  render: (args) => (
    <MenuTrigger>
      <Button variant="secondary" className="px-2">
        <MoreHorizontal className="w-5 h-5" />
      </Button>
      <Menu {...args}>
        <MenuItem id="new">New…</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuSeparator />
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="saveAs">Save as…</MenuItem>
        <MenuSeparator />
        <MenuItem id="print">Print…</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
};

export const Sections: StoryFn<typeof meta> = (args) => (
  <MenuTrigger>
    <Button variant="secondary" className="px-2">
      <MoreHorizontal className="w-5 h-5" />
    </Button>
    <Menu {...args}>
      <MenuSection title="Your Content">
        <MenuItem id="repos">Repositories</MenuItem>
        <MenuItem id="projects">Projects</MenuItem>
        <MenuItem id="organizations">Organizations</MenuItem>
        <MenuItem id="stars">Stars</MenuItem>
        <MenuItem id="sponsors">Sponsors</MenuItem>
      </MenuSection>
      <MenuSection title="Your Account">
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="status">Set status</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </MenuSection>
    </Menu>
  </MenuTrigger>
);

export const Submenu: StoryFn<typeof meta> = (args) => (
  <MenuTrigger>
    <Button variant="secondary" className="px-2">
      <MoreHorizontal className="w-5 h-5" />
    </Button>
    <Menu {...args}>
      <MenuItem id="new">New…</MenuItem>
      <SubmenuTrigger>
        <MenuItem id="open">Open</MenuItem>
        <Popover>
          <Menu>
            <MenuItem id="open-new">Open in New Window</MenuItem>
            <MenuItem id="open-current">Open in Current Window</MenuItem>
          </Menu>
        </Popover>
      </SubmenuTrigger>
      <MenuSeparator />
      <MenuItem id="print">Print…</MenuItem>
      <SubmenuTrigger>
        <MenuItem id="share">Share</MenuItem>
        <Popover>
          <Menu>
            <MenuItem id="sms">SMS</MenuItem>
            <MenuItem id="twitter">Twitter</MenuItem>
            <SubmenuTrigger>
              <MenuItem id="email">Email</MenuItem>
              <Popover>
                <Menu>
                  <MenuItem id="work">Work</MenuItem>
                  <MenuItem id="personal">Personal</MenuItem>
                </Menu>
              </Popover>
            </SubmenuTrigger>
          </Menu>
        </Popover>
      </SubmenuTrigger>
    </Menu>
  </MenuTrigger>
);
