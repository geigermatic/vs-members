import { supabase } from './supabaseClient';
import type { Member } from '../types/member';
import type { FinancialHealthStats } from '../types/financialStats';

export const getMemberData = async (uuid: string): Promise<Member | null> => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('uuid', uuid)
    .single();

  if (error) throw error;
  return data;
};

export const getFinancialStats = async (uuid: string): Promise<FinancialHealthStats[]> => {
  const { data, error } = await supabase
    .from('financial_health_stats')
    .select('*')
    .eq('uuid', uuid)
    .order('month', { ascending: false });

  if (error) throw error;
  return data;
};

// Export the actual endpoints for reference
export const API_ENDPOINTS = {
  members: `${supabase.supabaseUrl}/rest/v1/members`,
  financialStats: `${supabase.supabaseUrl}/rest/v1/financial_health_stats`
}; 