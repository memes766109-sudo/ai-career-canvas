import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Plus, FileText, Globe, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Tables<"resumes">[]>([]);
  const [portfolios, setPortfolios] = useState<Tables<"portfolios">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [r, p] = await Promise.all([
        supabase.from("resumes").select("*").order("updated_at", { ascending: false }),
        supabase.from("portfolios").select("*").order("updated_at", { ascending: false }),
      ]);
      if (r.data) setResumes(r.data);
      if (p.data) setPortfolios(p.data);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const deleteResume = async (id: string) => {
    await supabase.from("resumes").delete().eq("id", id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resume deleted");
  };

  const deletePortfolio = async (id: string) => {
    await supabase.from("portfolios").delete().eq("id", id);
    setPortfolios((prev) => prev.filter((p) => p.id !== id));
    toast.success("Portfolio deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AI Folio</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Manage your AI resumes and portfolios</p>
          </div>
          <Button asChild className="gradient-bg border-0">
            <Link to="/builder">
              <Plus className="mr-2 h-4 w-4" /> Create New
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : resumes.length === 0 && portfolios.length === 0 ? (
          <Card className="py-16 text-center shadow-soft">
            <CardContent>
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary/40" />
              <h2 className="font-display text-xl font-semibold">No documents yet</h2>
              <p className="mt-2 text-muted-foreground">Create your first AI resume or portfolio to get started.</p>
              <Button asChild className="mt-6 gradient-bg border-0">
                <Link to="/builder">
                  <Plus className="mr-2 h-4 w-4" /> Create New
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {resumes.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Resumes
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resumes.map((r) => (
                    <Card key={r.id} className="shadow-soft hover:shadow-glow transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{r.title}</CardTitle>
                        <CardDescription>Template: {r.template} • Updated {new Date(r.updated_at).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/builder?resume=${r.id}`}>Edit</Link>
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteResume(r.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
            {portfolios.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-secondary" /> Portfolios
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {portfolios.map((p) => (
                    <Card key={p.id} className="shadow-soft hover:shadow-glow transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{p.title}</CardTitle>
                        <CardDescription>Template: {p.template} • {p.is_published ? "Published" : "Draft"}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/builder?portfolio=${p.id}`}>Edit</Link>
                        </Button>
                        {p.is_published && p.slug && (
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/portfolio/${p.slug}`}>View</Link>
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deletePortfolio(p.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
