import { InvitationInterface } from 'interfaces/invitation';
import { StartupInterface } from 'interfaces/startup';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  prompt: string;
  story?: string;
  startup_id?: string;
  created_at?: any;
  updated_at?: any;
  invitation?: InvitationInterface[];
  startup?: StartupInterface;
  _count?: {
    invitation?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  prompt?: string;
  story?: string;
  startup_id?: string;
}
