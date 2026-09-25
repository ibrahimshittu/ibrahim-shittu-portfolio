"""Offline illustrative contracts; no model calls or document mutations."""
from dataclasses import dataclass
from hashlib import sha256
import unittest


def digest(text: str) -> str:
    return sha256(text.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class Evidence:
    source_id: str
    content_hash: str
    start: int
    end: int
    quote: str


def verify_evidence(ref: Evidence, sources: dict[str, str]) -> bool:
    text = sources.get(ref.source_id)
    if text is None or digest(text) != ref.content_hash:
        return False
    if not 0 <= ref.start < ref.end <= len(text):
        return False
    return text[ref.start:ref.end] == ref.quote


@dataclass(frozen=True)
class Proposal:
    base_version: str
    replacement: str
    evidence: tuple[Evidence, ...]


def ready_for_review(proposal: Proposal, current_version: str,
                     sources: dict[str, str]) -> bool:
    return (
        proposal.base_version == current_version
        and bool(proposal.replacement.strip())
        and bool(proposal.evidence)
        and all(verify_evidence(ref, sources) for ref in proposal.evidence)
    )


def score(assessed_claims: list[bool], covered: set[str],
          required: set[str]) -> dict[str, float | None]:
    return {
        "support_rate": (
            sum(assessed_claims) / len(assessed_claims)
            if assessed_claims else None
        ),
        "required_fact_coverage": (
            len(covered & required) / len(required) if required else None
        ),
    }


class ContractChecks(unittest.TestCase):
    def test_reviewable_proposal_and_scoring(self):
        text = "Synthetic issuer: revenue was 12 million."
        ref = Evidence("source-1", digest(text), 0, len(text), text)
        proposal = Proposal("v1", text, (ref,))
        self.assertTrue(ready_for_review(proposal, "v1", {"source-1": text}))
        self.assertEqual(score([True, True, False], {"amount"}, {"amount", "period"}),
                         {"support_rate": 2 / 3, "required_fact_coverage": 0.5})
        self.assertIsNone(score([], set(), {"amount"})["support_rate"])

    def test_stale_or_unverifiable_proposal_is_rejected(self):
        text = "Synthetic issuer: revenue was 12 million."
        ref = Evidence("source-1", digest(text), 0, len(text), text)
        proposal = Proposal("v1", text, (ref,))
        self.assertFalse(ready_for_review(proposal, "v2", {"source-1": text}))
        self.assertFalse(ready_for_review(proposal, "v1", {"source-1": text + " Changed."}))
        self.assertFalse(ready_for_review(proposal, "v1", {}))


if __name__ == "__main__":
    unittest.main()
