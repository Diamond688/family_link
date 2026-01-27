// 前端调用后端 API 的封装
import { Memory, MemoryInput, Family, FamilyMember, PersonProfile } from '@/types';

const API_BASE = '/api';

// ============ 记忆相关 API ============

export async function getMemories(familyId?: string): Promise<Memory[]> {
  const url = familyId 
    ? `${API_BASE}/memories?familyId=${familyId}` 
    : `${API_BASE}/memories`;
  
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json();
}

export async function getMemory(id: string): Promise<Memory | null> {
  const res = await fetch(`${API_BASE}/memories/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function createMemory(memory: MemoryInput): Promise<{ data: Memory | null; error: Error | null }> {
  try {
    const res = await fetch(`${API_BASE}/memories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memory),
    });
    
    if (!res.ok) {
      const error = await res.json();
      return { data: null, error: new Error(error.error || '创建失败') };
    }
    
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function updateMemory(id: string, updates: Partial<MemoryInput>): Promise<{ error: Error | null }> {
  try {
    const res = await fetch(`${API_BASE}/memories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    
    if (!res.ok) {
      const error = await res.json();
      return { error: new Error(error.error || '更新失败') };
    }
    
    return { error: null };
  } catch (err) {
    return { error: err as Error };
  }
}

export async function deleteMemory(id: string): Promise<{ error: Error | null }> {
  try {
    const res = await fetch(`${API_BASE}/memories/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      const error = await res.json();
      return { error: new Error(error.error || '删除失败') };
    }
    
    return { error: null };
  } catch (err) {
    return { error: err as Error };
  }
}

// ============ 家族相关 API ============

export async function getFamilies(): Promise<Family[]> {
  const res = await fetch(`${API_BASE}/families`);
  if (!res.ok) return [];
  return res.json();
}

export async function createFamily(name: string, description?: string): Promise<{ data: Family | null; error: Error | null }> {
  try {
    const res = await fetch(`${API_BASE}/families`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      return { data: null, error: new Error(error.error || '创建失败') };
    }
    
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function getFamilyMembers(familyId: string): Promise<FamilyMember[]> {
  const res = await fetch(`${API_BASE}/families/${familyId}/members`);
  if (!res.ok) return [];
  return res.json();
}

// ============ 人物档案相关 API ============

export async function getPersonProfiles(familyId: string): Promise<PersonProfile[]> {
  const res = await fetch(`${API_BASE}/profiles?familyId=${familyId}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getPersonProfile(id: string): Promise<PersonProfile | null> {
  const res = await fetch(`${API_BASE}/profiles/${id}`);
  if (!res.ok) return null;
  return res.json();
}
